// Placeholder visuel pour toutes les données encore non fournies par le client.
// Rendu = `{{NOM}}` en mono petit, fond rule discret — repérable d'un œil
// dans le DOM sans casser le rythme typographique.

export function Ph({ name }: { name: string }) {
  return (
    <span
      className="inline-block bg-rule/40 px-1.5 py-0.5 font-mono text-micro uppercase tracking-widest text-mute"
      title="Donnée à fournir"
    >
      {`{{${name}}}`}
    </span>
  );
}
