'use client'
import { FileWithId } from '@/types/file';
import { makeGPTRequest } from '@/util/makeOAPIrequest';
import { tesseractProcessFile } from '@/util/tesseractProcessFile';
import { validateFileUpload } from '@/util/validateFileUpload';
import { CSSProperties, FC, useState } from 'react';

type FileUploadButtonProps = {
  style?: CSSProperties;
  label: string;
  children?: JSX.Element;
  disabled?: boolean;
}

export const FileUploadButton: FC<FileUploadButtonProps> = ({
  style,
  label,
  children,
  disabled = false,
}) => {
  const [isProcessingWithTesseract, setIsProcessingWithTesseract] = useState(false);
  const [isProcessingWithOAPI, setIsProcessingWithOAPI] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // const filesToBeUploaded: FileList | null = e.currentTarget?.files;
    // if (!filesToBeUploaded) {
    //   console.log('no files to be uploaded!');
    //   return;
    // }

    // const errorMessage = validateFileUpload(filesToBeUploaded, 'epro');
    // if (errorMessage) {
    //   console.log('error!', errorMessage);
    //   return;
    // }

    // const filesWithIdToBeUploaded = Array.from(filesToBeUploaded)

    // const strings = await tesseractProcessFile(filesWithIdToBeUploaded[0], setIsProcessingWithTesseract);
  
    // console.log('strings', strings);

    const jsonStruct = await makeGPTRequest(setIsProcessingWithOAPI);

    if (!jsonStruct.choices[0].message.content) {
      console.log('request to OAPI returned null!');
      return;
    }

    // strip newline chars from json response
    const jsonString = JSON.stringify(JSON.parse(jsonStruct.choices[0].message.content));

    console.log('jsonstring', jsonString);

    // send jsonStruct to Studies
    // await postJsonToStudies(jsonString)
  }

  return (
    <>
      {isProcessingWithTesseract && 'processing PDF in Tesseract...'}
      {isProcessingWithOAPI && 'processing strings with OAPI...'}
      <label
        style={{
          border: `1px solid blue`,
          borderRadius: '5px',
          background: 'blue',
          color: 'white',
          fontSize: '0.8rem',
          padding: '5px 10px',
          cursor: disabled ? 'none' : 'pointer',
          opacity: disabled ? '0.2' : '1',
          ...style,
        }}
      >
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={handleUpload}
          disabled={disabled}
        />
        {children}
        {label}
      </label>
    </>
  );
}
