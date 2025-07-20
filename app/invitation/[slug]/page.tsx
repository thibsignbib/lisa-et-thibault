import ClientInvitation from "./ClientInvitation"

export default function Page({ params }: { params: { slug: string } }) {
  return <ClientInvitation slug={params.slug} />
}
