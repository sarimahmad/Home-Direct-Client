import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, SectionList, View, Text, TouchableOpacity } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import CategoryCard from "../components/CategoryCard";
import colors from "../config/colors";
import articlesApi from "../api/articles";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import HeaderWithLeftLogo from "../components/HeaderWithLeftLogo";
import { SCREEN } from "../config/Constant";

var indoorCategories = [];
var outdoorCategories = [];

function ArticleCategoryScreen({ navigation, route }) {
  const getArticlesCategoriesApi = useApi(articlesApi.getCategories);
  const getArticlesApi = useApi(articlesApi.getArticles);
  const [searchState, setSearchState] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [indoorList, setIndoorList] = useState('');
  const [outdoorList, setOutdoorList] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getArticlesCategoriesApi.request();
    getArticlesApi.request();
    sortData();
  }, []);

  function sortData() {
    indoorCategories = []
    outdoorCategories = []
    getArticlesCategoriesApi.data && getArticlesCategoriesApi.data.forEach(element => {
      if (element.superCategory === 'outdoor') {
        outdoorCategories.push(element)
      } else {
        indoorCategories.push(element)
      }
    });
    setIndoorList(indoorCategories);
    setOutdoorList(outdoorCategories);
    setLoading(!loading)
  }

  getCount = (id) => {
    let count = 0;
    getArticlesCategoriesApi.data && getArticlesApi.data.forEach(element => {
      if (element.categoryId === id) { count++ }
    });
    return count;
  }

  return (
    <View style={styles.mainScreen}>
      <HeaderWithLeftLogo headerText={'Home'}
        searchValue={searchState}
        rightMenuPress={() => navigation.openDrawer()}
        backPress={() => this.props.navigation.pop()}
        searchPress={() => setSearchState(!searchState)} />
      <ActivityIndicator visible={getArticlesCategoriesApi.loading} />
      <View style={styles.SwtchWrapper}>
        <TouchableOpacity onPress={() => setSelectedIndex(0)} activeOpacity={0.8} style={[styles.Flex1, { backgroundColor: selectedIndex === 0 ? colors.orange : 'rgba(226, 226, 226, 1)' }]}>
          <Text style={styles.CategoryText}>Indoor</Text>
          <View style={styles.rightAbsoluteView}>
            <Text style={styles.countText}>{'6'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedIndex(1)} activeOpacity={0.8} style={[styles.Flex1, { backgroundColor: selectedIndex === 1 ? colors.orange : 'rgba(226, 226, 226, 1)' }]}>
          <Text style={styles.CategoryText}>Outdoor</Text>
          <View style={styles.rightAbsoluteView}>
            <Text style={styles.countText}>{'4'}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Screen style={styles.screen}>
        {getArticlesCategoriesApi.error && (
          <>
            <AppText>Couldn't retrieve the Menu.</AppText>
            <Button title="Retry" onPress={getArticlesCategoriesApi.request} />
          </>
        )}
        {selectedIndex == 0 ? <FlatList
          data={indoorList}
          keyExtractor={(item, index) => index.toString()}
          extraData={getArticlesCategoriesApi.data}
          renderItem={({ item }) => (
            <CategoryCard
              countValue={getCount(item.id)}
              title={item.name}
              onPress={() => navigation.navigate(routes.ARTICLE_SUB_CATEGORY, item)}
            />
          )}
        /> :
          <FlatList
            data={outdoorList}
            keyExtractor={(item, index) => index.toString()}
            extraData={getArticlesCategoriesApi.data}
            renderItem={({ item }) => (
              <CategoryCard
                countValue={getCount(item.id)}
                title={item.name}
                onPress={() => navigation.navigate(routes.ARTICLE_SUB_CATEGORY, item)}
              />
            )}
          />}
      </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 10,
    backgroundColor: colors.light,
  },
  SwtchWrapper: {
    height: 40,
    width: SCREEN.width,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  Flex1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  CategoryText: {
    fontSize: 15,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  mainScreen: {
    flex: 1,
  },
  rightAbsoluteView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    height: 30,
    width: 30,
    borderRadius: 15,
    paddingVertical: 7,
    backgroundColor: 'rgba(246, 246, 246, 1)',
  },
  countText: {
    color: colors.medium,
    fontSize: 13,
  },
});

export default ArticleCategoryScreen;
