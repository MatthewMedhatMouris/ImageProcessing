# ImageProcessing
App For Resizing Image

# Image Processing API project built using:
- Node.js and Express to build a server
- TypeScript 
- Unit Testing with Jasmine
- Third-party tools to do image processing


# The project can be built and run in the following ways:
- Build:
  `npm run build`
- Build and Testing:
  `npm run test`
  

# Endpoint:
/api/images?fileName=<imageName>&width=<width>&height=<height>

Example:
`http://localhost:3000/api/images?fileName=fjord&width=500&height=500`

  
# Available Image options:
- encenadaport
- fjord
- icelandwaterfall
- palmtunnel
- santamonica

# Functionality:
- Endpoint query takes different params to retrieve an image from available images with a specified width and height.
- All resized images will be saved in a specified folder.
- If a user requests an image that has already been resized, the image will not be resize and return directly from a specified folder.

  
