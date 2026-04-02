export interface Vehicle {
  id: string;
  titulo: string;
  marca: string;
  modelo: string;
  ano: number;
  preco: number;
  quilometragem: number;
  combustivel: string;
  cor: string;
  fotos: string[];
  descricao: string;
  localizacao: {
    cep: string;
    cidade: string;
    estado: string;
  };
  ficha_tecnica: {
    motor: string;
    potencia: string;
    cambio: string;
    portas?: number;
  };
  destaque?: boolean;
  badge?: 'novo' | 'vendido';
  criadoEm?: string;
  status?: 'publicado' | 'pausado' | 'rascunho';
}

export const MARCAS = ['Fiat', 'Honda', 'Toyota', 'Volkswagen', 'Hyundai', 'Chevrolet', 'Ford', 'Renault', 'Jeep', 'Nissan'] as const;

export const COMBUSTIVEIS = ['Flex', 'Gasolina', 'Etanol', 'Diesel', 'Elétrico', 'Híbrido'] as const;

export const MODELOS_POR_MARCA: Record<string, string[]> = {
  Fiat: ['Uno', 'Argo', 'Mobi', 'Toro', 'Strada', 'Pulse', 'Fastback'],
  Honda: ['Civic', 'City', 'HR-V', 'CR-V', 'Fit', 'WR-V'],
  Toyota: ['Corolla', 'Corolla Cross', 'Hilux', 'Yaris', 'RAV4', 'SW4'],
  Volkswagen: ['Golf', 'Polo', 'T-Cross', 'Nivus', 'Taos', 'Virtus', 'Saveiro'],
  Hyundai: ['HB20', 'Creta', 'Tucson', 'Santa Fe', 'HB20S'],
  Chevrolet: ['Onix', 'Tracker', 'S10', 'Spin', 'Montana', 'Cruze'],
  Ford: ['Ranger', 'Territory', 'Bronco Sport', 'Maverick'],
  Renault: ['Kwid', 'Sandero', 'Duster', 'Oroch', 'Captur'],
  Jeep: ['Renegade', 'Compass', 'Commander', 'Gladiator'],
  Nissan: ['Kicks', 'Versa', 'Frontier', 'Sentra'],
};
