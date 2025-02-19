import { Button, ButtonProps } from '@mantine/core';

function XIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      <path
        fill="none"
        stroke="#000"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export function XButton(props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) {
  return <Button leftSection={<XIcon />} variant="subtle" {...props} />;
}
