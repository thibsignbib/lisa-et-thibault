import ClientInvitation from "./ClientInvitation"

interface PageProps {
  params: Record<string, string>
}

export default function Page({ params }: PageProps) {
  return <ClientInvitation slug={params.slug} />
}
