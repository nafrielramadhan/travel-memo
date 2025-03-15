import { s3Client } from "@/utils/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadFile({ key, folder, body }) {
  // key nama file, folder file, body adalah binary

  // supaya body bisa disimpan di cloud sana.
  const buffer = Buffer.from(await body.arrayBuffer());

  try {
    const command = new PutObjectCommand({
      Bucket: "travel-memo",
      Key: `${folder}/${key}`,
      Body: buffer,
      ContentType: body.type,
    });

    const fileUpload = await s3Client.send(command);
    console.log({ fileUpload });
  } catch (error) {
    console.log(error);
  }
}
