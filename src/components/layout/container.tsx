type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({
  children,
}: ContainerProps) {
  return (
    <div className="container-custom">
      {children}
    </div>
  );
}