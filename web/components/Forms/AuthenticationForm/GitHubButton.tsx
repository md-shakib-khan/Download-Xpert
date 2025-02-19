import { Button, ButtonProps } from '@mantine/core';

function GithubIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      <path
        fill="#181717"
        d="M511.6 0C229.1 0 0 229.1 0 511.6c0 225.9 146.1 417.7 348.2 485.3 25.5 4.7 34.7-11.1 34.7-24.7 0-12.3-.4-45.1-.7-88.7-141.8 30.9-172.5-63.3-172.5-63.3-23.3-59.2-56.8-74.9-56.8-74.9-46.4-31.7 3.5-31.1 3.5-31.1 51.2 3.6 78.1 52.4 78.1 52.4 47.8 81.3 125.8 57.7 156.5 44.1 4.9-34.6 18.7-57.7 34.1-71.1-100.3-11.4-205.4-50.1-205.4-222.7 0-49.2 17.5-89.4 46.3-120.8-4.7-11.3-20.1-56.7 4.4-118.3 0 0 37.7-12.1 123.6 46.1 35.9-10.0 74.5-15.0 112.6-15.0s76.7 5.0 112.6 15.0c85.9-58.2 123.6-46.1 123.6-46.1 24.5 61.6 9.1 107.0 4.4 118.3 28.8 31.4 46.3 71.6 46.3 120.8 0 172.6-105.2 211.3-205.5 222.7 17.5 15.2 33.2 45.1 33.2 91.1 0 65.9-.6 119.4-.7 135.8 0 13.7 9.1 29.5 34.7 24.7 202.1-67.6 348.2-259.4 348.2-485.3 0-282.5-229.1-511.6-511.6-511.6z"
      />
    </svg>
  );
}

export function GitHubButton(props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) {
  return <Button leftSection={<GithubIcon />} variant="default" {...props} />;
}
