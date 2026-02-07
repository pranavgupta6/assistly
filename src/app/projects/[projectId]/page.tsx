interface Props {
    params : Promise<{
        projectId: string 
    }>
}


const Page = async ({ params }: Props) => {
  const { projectId } = await params;
  return (
    <div>
        Project id : {projectId}p
    </div>
  )
}

export default Page;