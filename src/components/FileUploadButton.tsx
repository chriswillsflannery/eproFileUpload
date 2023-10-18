import { CSSProperties, FC } from 'react';

type FileUploadButtonProps = {
  style?: CSSProperties;
  onChange: (e: any) => void;
  label: string;
  children?: JSX.Element;
  disabled?: boolean;
}

export const FileUploadButton: FC<FileUploadButtonProps> = ({
  style,
  onChange,
  label,
  children,
  disabled = false,
}) => (
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
      onChange={onChange}
      disabled={disabled}
    />
    {children}
    {label}
  </label>
)
