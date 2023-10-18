import { FileUploadButton } from '../components/FileUploadButton'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <FileUploadButton
        label={`Attach PDF`}
        disabled={false}
      />
    </main>
  )
}
