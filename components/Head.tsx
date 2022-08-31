import Head from "next/head";
import { Fragment } from "react";

type Props = {
  title: string;
};

export default function HeadApp({ title }: Props) {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/img/logo.svg" type="image/svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="NK Informática, sistemas de gestão, marketing digital, desenvolvimento web e mobile, gestão de redes sociais."
        />
        <meta
          name="keywords"
          content="nk info, nk informática, informática, sistemas, desenvolvimento, web, mobile, programação, web design, programador, developer, devops, react, next, node, sites, web sites, android, ios"
        />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="NK Informática, sistemas, desenvolvimento web e mobile, marketing digital e gestão de redes sociais."
        />
        <meta property="og:url" content="https://nkinfo.com.br/" />
        <meta
          property="og:site_name"
          content="NK Informática, sistemas, desenvolvimento web e mobile, marketing digital e gestão de redes sociais."
        />
        <meta
          name="og:description"
          content="NK Informática, sistemas de gestão, marketing digital, desenvolvimento web e mobile, gestão de redes sociais."
        />
        <meta name="robots" content="index,nofollow" />
        <meta
          property="og:author"
          content="NK Informática de Pedro Afonso - TO, Desenvolvedor Responsável: Natanael Bezerra"
        />
        <meta name="googletboot" content="index,nofollow" />
        <meta httpEquiv="content-language" content="pt-br" />
        <meta content="Global" name="distribution" />
        <meta
          name="google-site-verification"
          content="Gj4DMEkFphany6pT45md410ZCFb-6bzQ9uMyxZsyIMU"
        />
      </Head>
    </Fragment>
  );
}
