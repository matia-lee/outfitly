import sys
import os
from skimage import io
import torch
from PIL import Image
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'RMBG-1.4'))
from briarmbg import BriaRMBG
from utilities import preprocess_image, postprocess_image

def remove_background_and_save(input_path, output_path):
    # Load the model
    net = BriaRMBG.from_pretrained("briaai/RMBG-1.4")
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    net.to(device)

    # Prepare input
    orig_im = io.imread(input_path)
    orig_im_size = orig_im.shape[0:2]
    image = preprocess_image(orig_im, [1024, 1024]).to(device)

    # Inference
    result = net(image)

    # Post-process
    result_image = postprocess_image(result[0][0], orig_im_size)

    # Save result
    pil_im = Image.fromarray(result_image)
    no_bg_image = Image.new("RGBA", pil_im.size, (0,0,0,0))
    orig_image = Image.open(input_path)
    no_bg_image.paste(orig_image, mask=pil_im)
    no_bg_image.save(output_path)