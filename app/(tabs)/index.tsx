import {Image} from 'expo-image';
import {Platform, StyleSheet} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useSQLiteContext} from "expo-sqlite";
import useGames from "@/backend/domain/games/use-games";
import useGroups from "@/backend/domain/groups/use-groups";
import useItems from "@/backend/domain/items/use-items";

export default function HomeScreen() {
  const db = useSQLiteContext()
  const {games, createGame, updateGame} = useGames(db);
  const {groups, updateGroup, createGroup} = useGroups(db, 1);
  const {items, createItem, updateItem, updateItemGroups, selectItem, selectedItem} = useItems(db, 1)

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it!!!!!!!!!!</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">GAMES</ThemedText>
        {games.map(({gameId, title, character}) => (
          <ThemedText type="defaultSemiBold" key={gameId}>{gameId}: {title} :: {character}</ThemedText>
        ))}

        <ThemedText type="subtitle">GROUPS</ThemedText>
        {groups.map(({groupId, title, gameId}) => (
          <ThemedText type="defaultSemiBold" key={groupId}>{groupId}: {title} :: {gameId}</ThemedText>
        ))}

        <ThemedText type="subtitle">ITEMS</ThemedText>
        {items.map(({itemId, count, name}) => (
          <ThemedText type="defaultSemiBold" key={itemId}>{itemId}: {name} :: {count}</ThemedText>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
