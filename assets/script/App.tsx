import React from 'react';
import {
  Button,
  Grid,
  Header,
  Note,
  Text,
  Title,
  Value,
} from 'vk-style';
import './App.css';

interface Props {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  [key: string]: unknown;
}

function ToDo(props: Props = {}) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <div {...props} />;
}

function Tab({ children }: Props) {
  return <ToDo>{children}</ToDo>;
}

Tab.Page = function ({ children, title }: Props & { title: string }) {
  return (
    <>
      <Title>{ title }</Title>
      {children}
    </>
  );
};

// content
function PersonalOverview() {
  const values: any[] = [];

  let declaraties = <Text>Je hebt nog geen declaraties ingediend.</Text>;
  if (values.length > 0) {
    declaraties = (
      <Grid>
        {values.map((x) => <div>{x}</div>)}
      </Grid>
    );
  }

  let statements = <Text>Je hebt nog geen openstaande betalingen.</Text>;
  if (values.length > 0) {
    statements = (
      <Grid>
        {values.map((x) => <div>{x}</div>)}
      </Grid>
    );
  }

  return (
    <>
      <Grid>
        <div>
          <Value description="Openstaande betalingen">420,69</Value>
        </div>
        <div>
          <Value description="Openstaande declaraties">69</Value>
        </div>
      </Grid>
      <Note>Laatst bijgewerkt: ?</Note>
      <Header> {/* actions={<Button>+</Button>} */}Declaraties</Header>
      { declaraties }
      <Header>Betalingen</Header>
      { statements }
    </>
  );
}

function DebitorsOverview() {
  const debitors: any[] = [];
  return (
    <>
      <Header>Acties</Header>
      <>
        <Button>Importeren uit Kiwi</Button>
        <Button>Handmatig toevoegen</Button>
        <Button>Betalingen verwerken</Button>
        <Button>Facturen verzenden</Button>
      </>
      <Header>Openstaand</Header>
      <Grid>
        { debitors.map((x) => <div>{x}</div>)}
      </Grid>
      <Header>Betaald</Header>
      <Grid>
        { debitors.map((x) => <div>{x}</div>)}
      </Grid>
    </>
  );
}

function CreditorsOverview() {
  const creditors: any[] = [];
  return (
    <>
      <Header>Acties</Header>
      <Button>Handmatig toevoegen</Button>
      <Button>Nieuwe betalingen importeren</Button>
      <Header>Te verwerken</Header>
      <Grid>
        { creditors.map((x) => <div>{x}</div>)}
      </Grid>
      <Header>Verwerkt</Header>
      <Grid>
        { creditors.map((x) => <div>{x}</div>)}
      </Grid>
    </>
  );
}

function Settings() {
  const templates: any[] = [];
  return (
    <>
      <Header>E-mails</Header>
      <Grid>
        { templates.map((x) => <div>{x}</div>)}
      </Grid>
    </>
  );
}

function App() {
  const admin = true;
  return (
    <Tab>
      <Tab.Page title="Mijn overzicht">
        <PersonalOverview />
      </Tab.Page>
      { admin && (
      <>
        <Tab.Page title="Alle debiteuren">
          <DebitorsOverview />
        </Tab.Page>
        <Tab.Page title="Alle crediteuren">
          <CreditorsOverview />
        </Tab.Page>
        <Tab.Page title="Instellingen">
          <Settings />
        </Tab.Page>
      </>
      )}
    </Tab>
  );
}

export default App;
