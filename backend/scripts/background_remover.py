import numpy as np
import torch
from skimage import io
from PIL import Image
from transformers import AutoModelForImageSegmentation
import torchvision.transforms.functional as TF

def preprocess_image(im: np.ndarray, model_input_size: list) -> torch.Tensor:
    if len(im.shape) < 3:
        im = np.repeat(im[:, :, np.newaxis], 3, axis=2)
    im = TF.to_tensor(im)
    im = TF.resize(im, model_input_size)
    return im.unsqueeze(0) 

def postprocess_image(result: torch.Tensor, im_size: list) -> np.ndarray:
    result = torch.squeeze(result) 
    result_img = TF.to_pil_image(result)
    result_img = result_img.resize((im_size[1], im_size[0])) 
    result_np = np.array(result_img)
    return result_np

def remove_background_and_save(input_path, output_path):
    model = AutoModelForImageSegmentation.from_pretrained("briaai/RMBG-1.4", trust_remote_code=True)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)

    orig_im = io.imread(input_path)
    orig_im_size = orig_im.shape[:2]
    image = preprocess_image(orig_im, [1024, 1024]).to(device)

    with torch.no_grad():
        result = model(image)

    result_image = postprocess_image(result[0][0], orig_im_size)  

    pil_im = Image.fromarray(result_image)
    no_bg_image = Image.new("RGBA", pil_im.size, (0,0,0,0))
    orig_image = Image.open(input_path).resize(pil_im.size)
    no_bg_image.paste(orig_image, mask=pil_im)
    no_bg_image.save(output_path)