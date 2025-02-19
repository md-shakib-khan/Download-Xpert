import { Button, ButtonProps } from '@mantine/core';

function FacebookIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 320"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      <path
        fill="#1877F2"
        d="M320 160C320 71.6 248.4 0 160 0 71.6 0 0 71.6 0 160c0 79.6 61.6 148 140.8 159.2V205.6H99.6v-45.6h41.2v-35.2c0-43.2 24.8-67.2 66.4-67.2 19.6 0 40.8 3.6 40.8 3.6v44.8h-23.2c-22.4 0-29.6 13.6-29.6 27.2v33.6h50.4l-8 45.6h-42.4v114.4C258.4 308.8 320 240 320 160z"
      />
    </svg>
  );
}

export function FacebookButton(props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) {
  return <Button leftSection={<FacebookIcon />} variant="default" {...props} />;
}
