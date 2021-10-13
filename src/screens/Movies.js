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
const {width, height} = Dimensions.get('window');

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getincoming} from '../redux/actions/IncomingAction';
import {getToprated} from '../redux/actions/TopratedActions';
import {getpopular} from '../redux/actions/PopularActions';
import {getgenres} from '../redux/actions/GenresActions';

import {useSelector, useDispatch} from 'react-redux';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'November',
  'Dec',
];

const Movies = ({navigation, route}) => {
  const [nextnum, setnextnum] = useState(2);
  const [Genresdata, setGenresdata] = useState([]);

  const dispatch = useDispatch();

  const Incoming = useSelector(state => state.IncomingReducer);
  const TopRated = useSelector(state => state.TopRatedReducer);
  const Popular = useSelector(state => state.PopularReducer);
  const Genres = useSelector(state => state.GenresReducer);

  const renderItemGenres = ({item}) => {
    return (
      <View style={styles.rowreverse}>
        <View style={styles.cirtype2}>
          <Text allowFontScaling={false} style={styles.genrestext}>
            {item[0].name}
          </Text>
        </View>
      </View>
    );
  };
  useEffect(() => {
    try {
      if (nextnum == 2 && !Incoming.data.results) {
        dispatch(getincoming());
      } else if (nextnum == 1 && !Popular.data.results) {
        dispatch(getpopular());
      } else if (nextnum == 0 && !TopRated.data.results) {
        dispatch(getToprated());
      }
    } catch (e) {
      console.log(e);
    }
    return () => {};
  }, [nextnum]);

  useEffect(() => {
    dispatch(getgenres());
    return () => {};
  }, []);

  const renderItem = ({item}) => {
    var releasedate = new Date(item.release_date);
    const result = [];
    for (let index = 0; index < item.genre_ids.length; index++) {
      var element = {};
      element = Genres.data.genres.filter(
        Item => Item.id == item.genre_ids[index],
      );
      result.push(element);
    }

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MoviesDetails', {
            itemId: item.id,
            item: item,
          });
        }}
        style={styles.flatlistview}>
        <Image
          style={styles.img}
          source={{
            uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path,
          }}
        />
        <View style={styles.row}>
          <View style={{marginHorizontal: wp(4)}}>
            <Text allowFontScaling={false} style={styles.moviestitle}>
              {item.title}
            </Text>
            <Text allowFontScaling={false} style={styles.Moviedate}>
              {monthNames[releasedate.getMonth() + 1] +
                ' ' +
                releasedate.getDate() +
                ',' +
                releasedate.getFullYear()}
            </Text>

            <View style={styles.Movietype1}>
              <View style={styles.flatlisthelper}>
                <FlatList
                  numColumns={2}
                  data={result}
                  // horizontal={true}
                  renderItem={renderItemGenres}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>
          </View>
        </View>
        <Text allowFontScaling={false} style={styles.percentage}>
          {item.vote_average * 10}
          {'%'}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Text allowFontScaling={false} style={styles.header}>
          {'Movies'}
        </Text>
        <View style={styles.headerhelper}>
          <TouchableOpacity
            onPress={() => {
              setnextnum(0);
            }}
            style={{
              height: hp(5),
              width: wp(28),
              backgroundColor: nextnum == 0 ? '#47b711' : '#d8d8d8',
              borderRadius: hp(2),
              justifyContent: 'center',
            }}>
            <Text
              allowFontScaling={false}
              style={{
                alignSelf: 'center',
                color: nextnum == 0 ? '#FFF' : 'black',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              {'Top Rated'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setnextnum(1);
            }}
            style={{
              height: hp(5),
              width: wp(28),
              backgroundColor: nextnum == 1 ? '#47b711' : '#d8d8d8',
              borderRadius: hp(2),
              justifyContent: 'center',
            }}>
            <Text
              allowFontScaling={false}
              style={{
                alignSelf: 'center',
                color: nextnum == 1 ? '#FFF' : 'black',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              {'Popular'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setnextnum(2);
            }}
            style={{
              height: hp(5),
              width: wp(28),
              backgroundColor: nextnum == 2 ? '#47b711' : '#d8d8d8',
              borderRadius: hp(2),
              justifyContent: 'center',
            }}>
            <Text
              allowFontScaling={false}
              style={{
                alignSelf: 'center',
                color: nextnum == 2 ? '#FFF' : 'black',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              {'Upcoming'}
            </Text>
          </TouchableOpacity>
        </View>
        {(nextnum == 2 && Incoming.loading) ||
        (nextnum == 1 && Popular.loading) ||
        (nextnum == 0 && TopRated.loading) ? (
          <ActivityIndicator
            size="large"
            color="#47b711"
            style={{marginTop: hp(45)}}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={
              nextnum == 2
                ? Incoming.data.results
                : nextnum == 1
                ? Popular.data.results
                : TopRated.data.results
            }
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        )}
      </View>
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
  header: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerhelper: {
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  cir: {
    marginTop: hp(2),
    height: hp(5),
    width: wp(28),
    backgroundColor: '#d8d8d8',
    borderRadius: hp(2),
    justifyContent: 'center',
  },
  title: {},
  flatlistview: {
    borderColor: '#173A6433',
    borderWidth: 1,
    borderRadius: hp(2),
    minHeight: hp('20%'), // 20% of height device screen
    width: wp('90%'), //
    marginVertical: hp(1),
    flexDirection: 'row',
    padding: hp(1),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  percentage: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-start',
    color: '#47b711',
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    minWidth: wp(50),
  },
  moviestitle: {
    maxWidth: wp(44),
    fontWeight: 'bold',
  },
  Moviedate: {
    marginTop: hp(2),
    color: '#9a9a9a',
    maxWidth: wp(44),
  },
  Movietype1: {
    flexDirection: 'row',
    marginBottom: hp(1),
    marginTop: hp(2),
  },
  flatlisthelper: {
    width: wp(44),
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  cirtype: {
    height: hp(3),
    padding: 4,
    backgroundColor: '#d8d8d8',
    borderRadius: hp(2),
    marginRight: wp(2),
    paddingHorizontal: wp(2),
  },
  cirtype2: {
    height: hp(3),
    backgroundColor: '#d8d8d8',
    borderRadius: hp(2),
    justifyContent: 'center',
    paddingHorizontal: wp(2),
    marginHorizontal: wp(1),
    marginBottom: wp(1),
    alignItems: 'flex-end',
    marginTop: hp(0.5),
  },
  genrestext: {color: '#7b7b7b', fontSize: 12},
  img: {
    height: hp(18),
    width: wp(20),
    borderRadius: 8,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    marginHorizontal: wp(1),
  },
});
