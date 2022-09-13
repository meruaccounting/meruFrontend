import create from 'zustand';

const useStore = create((set) => ({
  clients: {
    clients: [],
    loader: true,
  },
  
  setClients: (clients, loader) =>
    set(() => ({
      clients: {
        clients,
        loader,
      },
    })),
  //   removePokemon: (id) =>
  //     set((state) => ({
  //       pokemons: state.pokemons.filter((pokemon) => pokemon.id !== id),
  //     })),
}));
export default useStore;
