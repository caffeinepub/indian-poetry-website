import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Poet, ContentCategory, PoetryContent } from '../backend';

export function usePoet(stateOrUT: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Poet>({
    queryKey: ['poet', stateOrUT],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getPoet(stateOrUT);
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useMainPoet() {
  const { actor, isFetching } = useActor();

  return useQuery<Poet>({
    queryKey: ['mainPoet'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getMainPoet();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePoemsByCategory(poetId: string, category: ContentCategory) {
  const { actor, isFetching } = useActor();

  return useQuery<PoetryContent[]>({
    queryKey: ['poems', poetId, category],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getPoemsByCategory(poetId, category);
    },
    enabled: !!actor && !isFetching && !!poetId,
  });
}

export function useAllPoets() {
  const { actor, isFetching } = useActor();

  return useQuery<Poet[]>({
    queryKey: ['allPoets'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllPoets();
    },
    enabled: !!actor && !isFetching,
  });
}
