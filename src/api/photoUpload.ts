// api/photoUpload.ts
export const uploadPhoto = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    "https://10.171.0.12/komus_career_app/api/controller.html?action=upload_photo",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload photo");
  }

  const data = await response.json();
  return data.url; // Assuming the response contains the URL of the uploaded photo
};
