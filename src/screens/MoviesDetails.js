import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  FlatList,
  I18nManager,
  ActivityIndicator,
  Share,
  Modal,
  Linking,
  Alert,
  RefreshControl,
  TextInput,
  Button,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {getcredits} from '../redux/actions/CreditsActions';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Upcoming',
    itemnumber: 776,
    notfi: 1,
    naviname: 'Drafted item',
    clicknum: 1,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Popular',
    itemnumber: 776,
    naviname: 'Need to refinement ',
    notfi: 1,
    clicknum: 6,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Top Rated',
    naviname: 'Forwarded to validator',
    itemnumber: 776,
    notfi: 1,
    clicknum: 2,
  },
];

const Movies = ({navigation, route}) => {
  const {itemId, item} = route.params;
  const [Genresdata, setGenresdata] = useState([]);
  const dispatch = useDispatch();
  const Genres = useSelector(state => state.GenresReducer);
  const Credits = useSelector(state => state.CreditsReducer);
  const renderItemCredits = ({item}) => {
    return (
      <View style={{marginLeft: wp(4)}}>
        <View>
          <View style={styles.imgview}>
            <Image
              style={styles.cirimg}
              source={{
                uri: 'https://image.tmdb.org/t/p/w500' + item.profile_path,
              }}
            />
          </View>
          <Text style={styles.names}>{item.name}</Text>
        </View>
      </View>
    );
  };
  useEffect(() => {
    dispatch(getcredits(itemId));
    const result = [];
    for (let index = 0; index < item.genre_ids.length; index++) {
      var element = {};
      element = Genres.data.genres.filter(
        Item => Item.id == item.genre_ids[index],
      );
      result.push(element);
    }
    setGenresdata(result);
    return () => {};
  }, []);

  const renderItemGenres = ({item}) => {
    return (
      <View style={styles.rowreverse}>
        <View style={styles.cirtype2}>
          <Text allowFontScaling={false}>{item[0].name}</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Ionicons
          name="chevron-back"
          color={'#000'}
          size={32}
          onPress={() => {
            navigation.navigate('Movies');
          }}
        />

        <Image
          style={styles.img}
          source={{
            uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path,
          }}
        />

        <Text allowFontScaling={false} style={styles.Moviesname}>
          {' '}
          {item.title}{' '}
        </Text>
        <Text allowFontScaling={false} style={styles.percentage}>
          {item.vote_average * 10} {'%'}
        </Text>

        <Text allowFontScaling={false} style={styles.generaltext}>
          {'Overview'}
        </Text>
        <Text allowFontScaling={false} style={{color: '#4d6677'}}>
          {item.overview}
        </Text>
        <Text allowFontScaling={false} style={styles.generaltext}>
          {'Genres'}
        </Text>
        <View>
          {Genresdata.length < 1 ? (
            <ActivityIndicator size="large" color="#47b711" />
          ) : (
            <FlatList
              data={Genresdata}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItemGenres}
              keyExtractor={item => item.id}
            />
          )}
        </View>

        <Text allowFontScaling={false} style={styles.generaltext}>
          {'Credits'}
        </Text>
        {Credits.loading ? (
          <ActivityIndicator size="large" color="#47b711" />
        ) : (
          <FlatList
            data={Credits.data.cast}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItemCredits}
            keyExtractor={item => item.id}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Movies;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: wp(4),
  },

  img: {
    height: hp(25),
    width: wp(35),
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: hp(2),
  },
  imgview: {
    backgroundColor: '#000',
    height: hp(10),
    width: hp(10),
    borderRadius: hp(5),
    alignSelf: 'center',
  },
  cirimg: {
    height: hp(10),
    width: hp(10),
    borderRadius: hp(5),
    alignSelf: 'center',
  },
  names: {marginTop: hp(0.5), alignSelf: 'center'},

  Moviesname: {
    alignSelf: 'center',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: hp(1.2),
  },
  percentage: {
    alignSelf: 'center',
    color: '#47b711',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: hp(1),
  },
  generaltext: {fontWeight: 'bold', marginBottom: hp(1), marginTop: hp(2)},
  cirtype2: {
    height: hp(3),
    backgroundColor: '#d8d8d8',
    borderRadius: hp(2),
    justifyContent: 'center',
    paddingHorizontal: wp(2),
  },
  rowreverse: {
    marginVertical: hp(0.5),
    marginHorizontal: wp(2),
    flexDirection: 'row-reverse',
  },
});
