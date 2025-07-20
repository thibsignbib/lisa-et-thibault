import ClientInvitation from "./ClientInvitation"

export default function Page(props: any) {
  return <ClientInvitation slug={props.params.slug} />
}

