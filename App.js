
import React, { useCallback, useRef, useMemo, useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const App = () => {
  const [userData, setUserData] = useState({
    gender: "Male"
  })



  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["60%", "50%", "90%"], []);
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Button title={`Gender: ${userData?.gender}`} onPress={() => handleSnapPress(0)} />
        <Button title="Close" onPress={() => handleClosePress()} />
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          enablePanDownToClose={true}
          index={-1}
        >
          <BottomSheetView style={{ paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "700", color: "#000" }}>Select Gender</Text>
            <View style={{ marginTop: 15 }}>
              <RadioGroup
                data={[
                  "Male",
                  "Female",
                  "Transgender"
                ]}
                selected={userData?.gender}
                onChange={(value) => setUserData({ ...userData, gender: value })}
              />
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    backgroundColor: "#eaeaea"
  },
});

const RadioGroup = ({ data = [], selected, onChange }) => {
  return (
    <View>
      {data.map((item, index) =>
        <TouchableOpacity
          onPress={() => onChange(item)}
          key={index}
          style={[{ flexDirection: "row", alignItems: "center", marginTop: 10 }]}
        >
          <View
            style={[{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: selected === item || selected == item.label ? "#000" : '#707070',
              alignItems: 'center',
              justifyContent: 'center',
            }]}

          >
            {
              selected === item || selected == item.label ?
                <View style={{
                  height: 13,
                  width: 13,
                  borderRadius: 6,
                  backgroundColor: '#000',
                }} />
                : null
            }

          </View>
          <Text style={{ marginLeft: 10, fontSize: 14, color: "#707070" }}>
            {typeof item == "string" ? item : item.label}
          </Text>
        </TouchableOpacity>
      )}
    </View>

  );
}


export default App;
