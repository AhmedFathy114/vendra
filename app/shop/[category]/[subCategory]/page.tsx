async function Page({ params }: { params: Promise<{ subCategory: string }> }) {
  const { subCategory } = await params;
  console.log(subCategory);
  return (
    <>
      <div></div>
    </>
  );
}

export default Page;
