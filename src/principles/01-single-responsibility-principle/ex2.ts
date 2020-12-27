/* 
Aplicando o príncipio SRP em uma função que tem mais de uma responsabilidade: 

function emailClients(array $clients): void
{
    foreach ($clients as $client) {
        $clientRecord = $db->find($client);
        if ($clientRecord->isActive()) {
            email($client);
        }
    }
}
*/

interface Client {
  id: string;
  name: string;
  email: string;
  active: boolean;
}

const clients: Client[] = [
  {
    id: "1",
    name: "Albert",
    email: "ab@ab.com",
    active: true,
  },
  {
    id: "2",
    name: "Newton",
    email: "nt@nt.com",
    active: true,
  },
  {
    id: "3",
    name: "Phillip",
    email: "ph@ph.com",
    active: false,
  },
];

const sendEmail = (email: string): void => {
  console.info(`Send message to email: ${email}`);
};

const getActiveClients = (): Client[] => {
  return clients.filter((client) => client.active);
};

const sendEmailToActiveClients = (): void => {
  const clients: Client[] = getActiveClients();
  clients.forEach((client) => sendEmail(client.email));
};

// Run
console.info("\nRun SRP 02: \n");
sendEmailToActiveClients();
