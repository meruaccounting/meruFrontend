import create from 'zustand';

const useStore = create((set) => ({
  teams: {
    teams: [],
    loader: true,
    error: false,
  },

  setTeams: (teams, loader) =>
    set(() => ({
      teams: {
        teams,
        loader,
      },
    })),
  //   removePokemon: (id) =>
  //     set((state) => ({
  //       pokemons: state.pokemons.filter((pokemon) => pokemon.id !== id),
  //     })),
}));
export default useStore;
