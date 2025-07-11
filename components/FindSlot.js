import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const FindSlot = ({
  slots,
  selectedSlot,
  setSelectedSlot,
  date,
  selectedNumber,
}) => {
  const [slotsVisible, setSlotsVisible] = useState(false);

  const handlePress = () => {
    setSlotsVisible(!slotsVisible);
  };

  const handleSlotPress = (slotItem) => {
    const prevSlot = selectedSlot;
    if (prevSlot === slotItem) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot(slotItem);
    }
  };
  return (
    <View className="flex-1">
      <View className={`flex ${selectedSlot != null && "flex-row"} px-3`}>
        <View className={` ${selectedSlot !== null && "flex-1"}`}>
          <TouchableOpacity onPress={handlePress}>
            <Text className="text-center text-lg font-semibold bg-[#f49b33] p-2 my-3 mx-2 rounded-lg">
              Find slot
            </Text>
          </TouchableOpacity>
        </View>
        {selectedSlot != null && (
          <View className="flex-1">
            <TouchableOpacity>
              <Text className="text-center font-semibold text-lg  bg-[#f49b33] p-2 my-3 mx-2 rounded-lg text-white">
                Book slot
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {slotsVisible && (
        <View className="flex-wrap flex-row bg-[#474747] mx-2 p-2 rounded-lg">
          {slots &&
            slots.length > 0 &&
            slots.map((slotItem, index) => (
              <TouchableOpacity
                onPress={() => handleSlotPress(slotItem)}
                className={`m-2 p-4 bg-[#f49b33] rounded-lg items-center justify-center ${selectedSlot && selectedSlot != slotItem ? "opacity-50" : ""} `}
                key={index}
                disabled={
                  selectedSlot == slotItem || selectedSlot == null
                    ? false
                    : true
                }
              >
                <Text>{slotItem}</Text>
              </TouchableOpacity>
            ))}
        </View>
      )}
    </View>
  );
};

export default FindSlot;
