import { x } from '@xstyled/styled-components';
import Link from 'next/link';

const gyms = [
  { key: 'not', name: 'Nottingham' },
  { key: 'shf', name: 'Sheffied' },
  { key: 'bir', name: 'Birmingham' },
];

export default function Home() {
  return (
    <x.div container={{ sm: true }} mx="auto" px={3} my={{ _: 3, md: 5 }}>
      <x.h1 mb={{ _: 3, md: 5 }}>Gym Occupancy</x.h1>
      <x.div>
        {gyms.map(({ key, name }) => (
          <Link key={key} href={`/occupancy/${key}`} passHref>
            <x.a
              display="block"
              py={3}
              px={4}
              mb={3}
              borderRadius="md"
              color="text"
              textDecoration="none"
              backgroundColor={{ _: 'secondary-a10', hover: 'secondary-a20' }}
              ring={{ focus: 3 }}
              ringColor={{ focus: 'primary-a40' }}
              outline="none"
            >
              <x.h2>Depot {name}</x.h2>
            </x.a>
          </Link>
        ))}
      </x.div>
    </x.div>
  );
}
