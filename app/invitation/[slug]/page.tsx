import ClientInvitation from "./ClientInvitation"

type Params = { params: { slug: string } }

export default function Page({ params }: Params) {
  return <ClientInvitation slug={params.slug} />
}
