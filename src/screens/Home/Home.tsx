import React from 'react';
import {Text, View} from '../../theme/theme';
import {Button, FlatList, Image, ImageBackground, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/Navigator.tsx';
import {useGameContentClient} from '../../context/gameContentClientContext.tsx';
import {logDebug, logError} from '../../../backend/utils/log-system/log-system.ts';
import MapsEndpoint from '../../../backend/api/endpoints/game-content/maps/maps.ts';
import {IMap} from '../../../backend/api/types/game-content/Maps/Maps.ts';
import {useTheme} from '../../theme/ThemeProvider.tsx';
import LinearGradient from 'react-native-linear-gradient';
import {useApi} from '../../context/apiContext.tsx';
import {IAgent} from '../../../backend/api/types/game-content/Agents/Agents.ts';
import AgentsByUuidEndpoint from '../../../backend/api/endpoints/game-content/agents/custom/agents.ts';
import {useValorantClient} from '../../context/valorantClientContext.tsx';
import OwnedItemsEndpoint from '../../../backend/api/endpoints/store/owned-items.ts';
import {IEntitlement, IEntitlementByType, ItemTypeID} from '../../../backend/api/types/store/owned-items.ts';

const agentBlueBg = require('../../assets/team/AgentBlueBackground.png');
const agentRedBg = require('../../assets/team/AgentRedBackground.png');

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({navigation}: Readonly<Props>): React.JSX.Element {
    const valorantClient = useValorantClient();
    const gameContentClient = useGameContentClient();
    const api = useApi();

    const [maps, setMaps] = React.useState<IMap[]>();
    const [agents, setAgents] = React.useState<IAgent[]>();

    React.useEffect(() => {
        async function fetchData() {
            try {
                const activeUser = api.getUserApi().getActiveUser();

                if (!activeUser) {
                    logError('Home: No active user');
                    return;
                }

                const ownerItemsResponse = await new OwnedItemsEndpoint(activeUser, ItemTypeID.AGENTS).query(
                    valorantClient,
                );

                if (ownerItemsResponse.isErr()) {
                    logError('Home: Failed to fetch owned agents: ' + ownerItemsResponse.getErr().message);
                    return;
                }

                const ownedItems = ownerItemsResponse.unwrap();
                const allAgents: Record<string, IAgent> = (
                    await new AgentsByUuidEndpoint().query(gameContentClient)
                ).unwrap();

                setAgents(
                    ownedItems.EntitlementsByTypes.map((entitlementByType: IEntitlementByType) =>
                        entitlementByType.Entitlements.map((agent: IEntitlement) => allAgents[agent.ItemID]),
                    ).flat(),
                );

                logDebug('Fetched agents: ' + JSON.stringify(agents));

                const response = await new MapsEndpoint().query(gameContentClient);
                if (response.isErr()) {
                    logError('Failed to fetch agents: ' + response.getErr().message);
                }
                const maps = response.unwrap().data;

                setMaps(maps);
            } catch (error) {
                logError('Failed to fetch data: ' + error);
            }
        }

        fetchData()
            .then(() => console.log('Data fetched'))
            .catch(e => console.error('HERE: ' + e));
    }, []);

    // Example splash image: https://media.valorant-api.com/maps/d960549e-485c-e861-8d71-aa9d1aed12a2/splash.png
    const {theme} = useTheme();

    const agentIconUrl = 'https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/displayicon.png';

    const cumColumns = 2;
    const boxWidth = 100 / cumColumns - 5;
    const marginLeft = (100 - boxWidth * cumColumns) / (cumColumns + 1);
    console.log(boxWidth);
    console.log(marginLeft);

    const styles = StyleSheet.create({
        box: {
            width: `${boxWidth}%`, // 45% of the parent width
            height: 200, // fixed height
            backgroundColor: theme.color.surface.tertiary,
            marginVertical: 10,
            marginLeft: `${marginLeft}%`,
            resizeMode: 'cover',
            borderRadius: theme.style.border.radius,
        },
        boxImage: {
            borderRadius: theme.style.border.radius,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
        },
        boxImageGradient: {
            width: '100%',
            height: '25%',
            position: 'absolute',
            bottom: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 5,
            textAlign: 'center',
        },
        mapName: {
            width: '30%',
            fontWeight: 'bold',
        },
        agentImage: {
            height: '80%',
            aspectRatio: 1,
            top: 20,
        },
        agentImagesContainer: {
            backgroundColor: '#00000000',
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0,
            top: -20,
        },
        agentImageContainer: {
            height: '175%',
            aspectRatio: 1.5,
            overflow: 'visible',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            right: -20,
        },
    });

    return (
        <View style={{height: '100%'}}>
            <Text>Home</Text>
            {maps ? (
                <FlatList
                    key={cumColumns}
                    data={maps}
                    numColumns={cumColumns}
                    keyExtractor={item => item.displayName}
                    renderItem={({item}) => (
                        <View key={item.displayName} style={styles.box}>
                            <ImageBackground source={{uri: item.splash}} style={styles.boxImage}>
                                <LinearGradient
                                    colors={['#000000DD', '#00000055', '#00000022']}
                                    style={styles.boxImageGradient}
                                    angle={45}
                                    useAngle={true}
                                    locations={[0.2, 0.8, 1.2]}>
                                    <Text style={styles.mapName}>{item.displayName}</Text>
                                    <View style={styles.agentImagesContainer}>
                                        {agentBlueBg && (
                                            <ImageBackground source={agentBlueBg} style={styles.agentImageContainer}>
                                                <Image source={{uri: agentIconUrl}} style={styles.agentImage} />
                                            </ImageBackground>
                                        )}
                                        {agentRedBg && (
                                            <ImageBackground source={agentRedBg} style={styles.agentImageContainer}>
                                                <Image source={{uri: agentIconUrl}} style={styles.agentImage} />
                                            </ImageBackground>
                                        )}
                                    </View>
                                </LinearGradient>
                            </ImageBackground>
                        </View>
                    )}
                />
            ) : null}
            <Button title={'Go to Loading'} onPress={() => navigation.navigate('Profile')} />
        </View>
    );
}
