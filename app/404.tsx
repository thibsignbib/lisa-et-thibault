export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-10 text-[#1B3A2F]">

      <div className="flex flex-col sm:flex-row items-center gap-10 max-w-4xl w-full">
        {/* Image à gauche */}
        <img
          src="/lisathibaultT.png"
          alt="Lisa et Thibault"
          className="w-48 sm:w-64 h-auto object-contain"
        />

        {/* Trait vertical */}
        <div className="w-px h-32 bg-[#1B3A2F]/30 hidden sm:block" />

        {/* Texte à droite */}
        <div className="text-center sm:text-left space-y-2">
          <h1 className="text-4xl font-bold text-wedding">404</h1>
          <p className="text-xl text-kgWildways-title">Invitation introuvable</p>
          <p className="text-kgWildways text-sm max-w-sm">
            Le lien est peut-être incorrect ou a expiré. <br />
            N’hésite pas à nous contacter si besoin.
          </p>
        </div>
      </div>
    </main>
  );
}
