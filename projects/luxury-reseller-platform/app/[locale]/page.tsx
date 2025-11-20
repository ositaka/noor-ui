import { getTranslations } from 'next-intl/server'

export default async function Home() {
  const t = await getTranslations('home')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-6">
        <h1 className="font-display text-6xl font-bold text-primary">
          {t('hero.title')}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          {t('hero.subtitle')}
        </p>
        <p className="text-base text-muted-foreground max-w-2xl">
          {t('hero.description')}
        </p>
      </div>
    </main>
  )
}
