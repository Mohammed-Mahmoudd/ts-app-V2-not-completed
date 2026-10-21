import { LinearGradient } from "expo-linear-gradient";
import {
  LucideCheck,
  LucideCircleAlert,
  LucideMapPin,
  LucideX,
} from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";
import { Request } from "../../types/request";

interface ReviewRequestModalProps {
  request: Request;
  onClose: () => void;
}

export default function ReviewRequestModal({
  request,
  onClose,
}: ReviewRequestModalProps) {
  return (
    <View>
      <LinearGradient
        colors={["#FFEBAB", "#C9A123", "#18181B"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.5, y: 1.5 }}
        style={{
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          alignItems: 'center',
          gap: 16,
          paddingTop: 24,
          paddingBottom: 80,
        }}
      >
        <LinearGradient
          colors={["#FFF8E1", "#9B8749", "#E9B928", "#FFD967", "#302B1C"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0.5, y: 1.5 }}
          style={{
            borderRadius: 999,
            padding: 4,
          }}
        >
          <Image
            source={{ uri: request.requester.profilePicture }}
            style={{ height: 96, width: 96, borderRadius: 9999 }}
          />
        </LinearGradient>
        <Text style={{ fontSize: 24, lineHeight: 32, fontFamily: 'NotoSerif-Bold', color: '#FFFFFF' }}>
          {request.requester.name}
        </Text>
        <Text style={{ fontFamily: 'NotoSerif', color: '#FFFFFF', textTransform: 'uppercase' }}>
          {request.requester.role} • {request.requester.instrument}
        </Text>
      </LinearGradient>

      <View style={{ transform: [{ translateY: -56 }], backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, gap: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, paddingHorizontal: 8, backgroundColor: '#fafafa', borderWidth: 1, borderColor: '#f4f4f5', borderRadius: 16 }}>
          <Text style={{ color: '#71717a' }}>Request Branch</Text>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              flexDirection: 'row',
              gap: 8,
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: 9999,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 2,
            }}
          >
            <LucideMapPin size={20} color="#D4AF37" />
            <Text style={{ fontFamily: 'NotoSerif-Bold', color: '#18181b' }}>
              {request.payload.branch}
            </Text>
          </View>
        </View>

        <View style={{ backgroundColor: 'rgba(255, 251, 235, 0.5)', borderColor: 'rgba(254, 243, 199, 0.5)', padding: 16, borderRadius: 16, flexDirection: 'row', gap: 8, borderWidth: 1 }}>
          <LucideCircleAlert size={20} color="#D4AF37" />
          <Text style={{ fontFamily: 'NotoSerif-Bold', color: '#b45309', fontSize: 14, lineHeight: 20 }}>
            This request requires a physical room. Check studio availability.
          </Text>
        </View>

        <View style={{ padding: 16, borderWidth: 1, borderColor: '#f4f4f5', borderRadius: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'NotoSerif-Bold', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: 1.2 }}>
              Type
            </Text>
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 9999,
                backgroundColor: request.colors.bg,
              }}
            >
              <Text
                style={{ fontFamily: 'NotoSerif-Bold', color: request.colors.text }}
              >
                {request.type
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Text>
            </View>
          </View>
          <View style={{ height: 1, backgroundColor: '#f4f4f5', marginVertical: 16 }} />
          <View>
            <Text style={{ fontFamily: 'NotoSerif-Bold', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: 1.2 }}>
              Reason
            </Text>
            <Text style={{ fontFamily: 'NotoSerif', color: '#52525b' }}>
              &quot;I have a conflict with my schedule&quot;
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 16 }}>
          <Pressable
            onPress={onClose}
            style={{ flex: 1, borderWidth: 1, borderColor: '#e4e4e7', borderRadius: 24, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <LucideX size={20} color="#52525C" />
            <Text style={{ fontFamily: 'NotoSerif-Bold', color: '#52525b' }}>Reject</Text>
          </Pressable>
          <Pressable
            onPress={onClose}
            style={{
              flex: 1,
              borderRadius: 24,
              paddingVertical: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              backgroundColor: '#D4AF37',
              shadowColor: "#D4AF37",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 8,
            }}
          >
            <LucideCheck size={20} color="#fff" />
            <Text style={{ fontFamily: 'NotoSerif-Bold', color: '#FFFFFF' }}>Approve</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
