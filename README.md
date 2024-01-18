# Image Upload API

This API allows users to upload and retrieve images.

## Endpoints

### 1. Upload Image

**Route:** `POST /upload`

**Description:** Uploads an image.

**Request:**
- `FormData` with the image file

**Response:**
- 201 Created: Image uploaded successfully
- 400 Bad Request: Input cannot be empty. Please select an image

### 2. Get Images

**Route:** `GET /images`

**Description:** Retrieves all uploaded images.

**Response:**
- Renders the "images" template with the fetched images (HTML)


**Error Handling:**
- 500 Internal Server Error: Generic server error
- 500 Internal Server Error: Error fetching images (with specific error message if available)

## Uploading an Image

To upload an image to the server, make a `POST` request to the `/upload` endpoint with a `FormData` object. Ensure that the form field for the image file is named 'image'. Below is an example using JavaScript and the Fetch API:

```html
<!-- HTML Form -->
<form id="imageForm" enctype="multipart/form-data">
  <input type="file" name="image" />
  <button type="button" onclick="uploadImage()">Upload Image</button>
</form>

<script>
async function uploadImage() {
  const formElement = document.getElementById('imageForm');
  const formData = new FormData(formElement);

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Image uploaded successfully:', data.message);
    } else {
      console.error('Error uploading image:', data.error);
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
}
</script>



