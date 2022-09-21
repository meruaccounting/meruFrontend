import create from 'zustand';

const useStore = create((set) => ({
  clients: {
    clients: [],
    loader: true,
    error: false,
  },

  setClients: (clients, loader) =>
    set((state) => ({
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
