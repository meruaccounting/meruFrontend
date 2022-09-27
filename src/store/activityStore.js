import create from 'zustand';

const useStore = create((set) => ({
  activities: {
    activities: [],
    loader: true,
  },

  setActivities: (activities, loader) =>
    set((state) => ({
      activities: {
        activities,
        loader,
      },
    })),
  //   removePokemon: (id) =>
  //     set((state) => ({
  //       pokemons: state.pokemons.filter((pokemon) => pokemon.id !== id),
  //     })),
}));
export default useStore;
