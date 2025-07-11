import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

const DateTimePickerComponent = ({ date, setDate }) => {
  const [show, setShow] = useState(false);

  const onChange = (e, selectedDate) => {
    const newDate = selectedDate || date;
    setDate(newDate);
    setShow(false);
  };
  const handlePress = () => {
    setShow(true);
  };
  return (
    <View className="flex-1 flex-row ml-4 mt-2 ">
      <TouchableOpacity
        onPress={handlePress}
        className={`rounded-lg text-[white] text-base ${Platform.OS == "android" && "py-1 px-2 justify-center  bg-[#474747]"}`}
      >
        <Text
          className={`${Platform.OS === "android" && "bg-[#474747] px-2 py-1 text-[gray]"}`}
        >
          {date.toLocaleDateString()}
        </Text>
        {Platform.OS === "android" && show && (
          <DateTimePicker
            display="default"
            value={date}
            onChange={onChange}
            textColor="#f49b33"
            accentColor="#f49b33"
            minimumDate={new Date()}
            mode="date"
            maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
          />
        )}
        {Platform.OS === "ios" && show && (
          <DateTimePicker
            display="default"
            value={date}
            onChange={onChange}
            textColor="#f49b33"
            accentColor="#f49b33"
            minimumDate={new Date()}
            mode="date"
            maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DateTimePickerComponent;
