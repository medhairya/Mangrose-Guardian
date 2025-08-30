import cv2
import numpy as np
from skimage.exposure import match_histograms


def highlight_mangrove_loss(
    old_img_path, new_img_path, output_path="output_mask.jpg",
    threshold_value=0.15, min_area=300
):
    # Load images
    old_img = cv2.imread(old_img_path)
    new_img = cv2.imread(new_img_path)

    if old_img is None or new_img is None:
        raise FileNotFoundError("One or both images not found!")

    # Resize new to match old
    new_img = cv2.resize(new_img, (old_img.shape[1], old_img.shape[0]))

    # Histogram matching (fixes brightness/contrast differences in Google Maps screenshots)
    new_img = match_histograms(new_img, old_img, channel_axis=-1).astype(np.uint8)

    # Convert to float
    old_float = old_img.astype(np.float32) / 255.0
    new_float = new_img.astype(np.float32) / 255.0

    # ---- Vegetation Index (NDVI-like using RGB) ----
    def fake_ndvi(img):
        R = img[:, :, 2]
        G = img[:, :, 1]
        ndvi = (G - R) / (G + R + 1e-6)
        return cv2.normalize(ndvi, None, 0, 1, cv2.NORM_MINMAX)

    old_veg = fake_ndvi(old_float)
    new_veg = fake_ndvi(new_float)

    # Difference (only vegetation loss)
    diff = old_veg - new_veg
    diff[diff < 0] = 0

    # Smooth before threshold
    diff_blur = cv2.GaussianBlur(diff, (5, 5), 0)

    # Binary mask
    _, mask = cv2.threshold(diff_blur, threshold_value, 1, cv2.THRESH_BINARY)

    # Morphological cleaning
    kernel = np.ones((5, 5), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel, iterations=2)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel, iterations=2)

    # Contour filtering (ignore tiny false detections)
    mask_uint8 = (mask * 255).astype(np.uint8)
    contours, _ = cv2.findContours(mask_uint8, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    clean_mask = np.zeros_like(mask_uint8)
    for cnt in contours:
        if cv2.contourArea(cnt) > min_area:
            cv2.drawContours(clean_mask, [cnt], -1, 255, -1)

    mask = (clean_mask / 255).astype(np.uint8)

    # ---- 🔹 Calculate % of mangrove loss ----
    _, old_veg_mask = cv2.threshold(old_veg, threshold_value, 1, cv2.THRESH_BINARY)

    total_veg_pixels = np.sum(old_veg_mask)
    lost_veg_pixels = np.sum(mask)

    if total_veg_pixels > 0:
        loss_percentage = (lost_veg_pixels / total_veg_pixels) * 100
    else:
        loss_percentage = 0.0

    # Convert mask to 3 channels
    mask_3c = np.zeros_like(new_img)
    mask_3c[mask == 1] = [0, 0, 255]  # red for loss

    # Overlay
    overlay = cv2.addWeighted(new_img, 0.7, mask_3c, 0.9, 0)

    # Put percentage text on overlay
    cv2.putText(
        overlay,
        f"Loss: {loss_percentage:.2f}%",
        (20, 40),
        cv2.FONT_HERSHEY_SIMPLEX,
        1.2,
        (255, 255, 255),
        3,
        cv2.LINE_AA,
    )

    cv2.imwrite(output_path, overlay)
    print(f"✅ Saved vegetation loss mask to {output_path}")
    print(f"🌱 Estimated Mangrove Loss: {loss_percentage:.2f}%")

    return loss_percentage


# 🔹 Example run with your Google Maps screenshots
highlight_mangrove_loss(
    "1.jpg",  # before
    "2.jpg",            # after
    "output_mask.jpg",
    threshold_value=0.2,  # tweak 0.15–0.3
    min_area=500          # filter out small noise
)
