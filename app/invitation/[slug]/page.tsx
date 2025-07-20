import ClientInvitation from "./ClientInvitation"

export default function Page(props: any) {
  const slug = props.params.slug as string
  return <ClientInvitation slug={slug} />
}
