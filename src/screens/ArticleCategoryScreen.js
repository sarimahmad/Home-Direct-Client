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
function ArticleCategoryScreen({ navigation }) {
  const getArticlesCategoriesApi = useApi(articlesApi.getCategories);

  const [searchState, setSearchState] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [indoorList, setIndoorList] = useState([])
  const [outdoorList, setOutdoorList] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    indoorCategories = []
    outdoorCategories = []
    getArticlesCategoriesApi.request();
    getArticlesCategoriesApi.data && getArticlesCategoriesApi.data.forEach(element => {
      if (element.superCategory === 'outdoor') {
        outdoorCategories.push(element)
      } else {
        indoorCategories.push(element)
      }
    });
    setIndoorList(indoorCategories);
    setOutdoorList(outdoorCategories);
    indoorCategories.length > 0 && setLoading(false)
  }, []);


  return (
    <View style={styles.mainScreen}>
      <HeaderWithLeftLogo headerText={'Home'}
        searchValue={searchState}
        rightMenuPress={() => navigation.openDrawer()}
        backPress={() => this.props.navigation.pop()}
        searchPress={() => setSearchState(!searchState)} />
      <ActivityIndicator visible={getArticlesCategoriesApi.loading} />

      <View style={styles.SwtchWrapper}>
        <TouchableOpacity onPress={() => setSelectedIndex(0)} activeOpacity={0.8} style={[styles.Flex1, { backgroundColor: selectedIndex === 0 ? '#e03c1f' : 'rgba(226, 226, 226, 1)' }]}>
          <Text style={styles.CategoryText}>Indoor</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedIndex(1)} activeOpacity={0.8} style={[styles.Flex1, { backgroundColor: selectedIndex === 1 ? '#e03c1f' : 'rgba(226, 226, 226, 1)' }]}>
          <Text style={styles.CategoryText}>Outdoor</Text>
        </TouchableOpacity>
      </View>
      <Screen style={styles.screen}>
        {getArticlesCategoriesApi.error && (
          <>
            <AppText>Couldn't retrieve the articles.</AppText>
            <Button title="Retry" onPress={getArticlesCategoriesApi.request} />
          </>
        )}
        {selectedIndex == 0 && indoorList.length > 0 && !loading ? <FlatList
          data={indoorList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <CategoryCard
              title={item.name}
              onPress={() => navigation.navigate(routes.ARTICLE_SUB_CATEGORY, item)}
            />
          )}
        /> : outdoorList.length > 0 && !loading &&
        <FlatList
          data={outdoorList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <CategoryCard
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
  },
  CategoryText: {
    fontSize: 15,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  mainScreen: {
    flex: 1,
  },
});

export default ArticleCategoryScreen;
