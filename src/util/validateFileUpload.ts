export const validateFileUpload = (
  filesToBeUploaded: FileList,
  uploadType: 'epro' | undefined,
) => {
  if (!FileList || !uploadType) {
    return 'Something went wrong - please try again.';
  }
  // VALIDATE FILE EXTENSION
  if (uploadType === 'epro') {
    if (filesToBeUploaded[0].type !== 'application/pdf' && filesToBeUploaded[0].type !== 'image/jpeg') {
      return 'must be PDF or image';
    }
  }
  // VALIDATE MAX NAME LENGTH
  if (filesToBeUploaded[0].name.length >= 80) {
    return 'file name must be < 80 characters';
  }
  // VALIDATE FILE SIZE LIMIT FOR DOS ATK
  if (filesToBeUploaded[0].size >= 5000000) {
    return 'file size must be < 5mb';
  }
  return '';
}
