'use client'
import { FileWithId } from '@/types/file';
import { makeGPTRequest } from '@/util/makeOAPIrequest';
import { validateFileUpload } from '@/util/validateFileUpload';
import { FileUploadButton } from '../components/FileUploadButton'
import styles from './page.module.css'

export default function Home() {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesToBeUploaded: FileList | null = e.currentTarget?.files;
    if (!filesToBeUploaded) {
      console.log('no files to be uploaded!');
      return;
    }

    const errorMessage = validateFileUpload(filesToBeUploaded, 'epro');
    if (errorMessage) {
      console.log('error!', errorMessage);
      return;
    }

    const filesWithIdToBeUploaded: FileWithId[] =
      Array.from(filesToBeUploaded)
      .map((file, idx) => ({ file, id: `${idx}` }));

    console.log('files', filesWithIdToBeUploaded);

    // const string = await send file to ML processor
  
    // const jsonStruct = await makeGPTRequest();
  }

  return (
    <main className={styles.main}>
      <FileUploadButton
        label={`Attach PDF`}
        onChange={(e) => handleUpload(e)}
        disabled={false}
      />
    </main>
  )
}
