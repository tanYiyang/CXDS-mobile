import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import tw from 'twrnc';

export default function Cart() {
  return (
    <ScrollView style={tw`w-full h-full bg-black px-4 py-6`}>
      {/* Delivery Info */}
      <View style={tw`flex-row items-center justify-between mb-4`}>
        <View style={tw`flex-row`}>
          <Image source={require('@/assets/images/cart/location.png')} style={tw`w-8 h-8 mr-1`} resizeMode="contain" />
          <View>
            <Text style={tw`text-white text-sm`}>Delivery: <Text style={tw`font-bold`}>CXDS 530009</Text></Text>
            <Text style={tw`text-gray-400 text-xs`}>KRIHOU, Night City...</Text>
          </View>
        </View>
        <TouchableOpacity style={tw`px-4 py-1 bg-gray-800 rounded-full`}>
          <Text style={tw`text-yellow-400 font-bold text-xs`}>CHANGE</Text>
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
      <View style={tw`bg-gray-900 rounded-xl mb-4`}>
        <CartItem title="Outfit" price="$2077" details="Cool Stick Man Guy Shirt" />
        <CartItem title="Niek Shirt" price="$615" details="Sold By: CXDS" size="69" qty="1" />
        <CartItem title="Pique" price="$1764" details="Sold By: CXDS" size="69" qty="1" />
      </View>

      {/* Donation */}
      <View style={tw`my-4`}>
        <Text style={tw`text-white text-lg font-bold`}>Donate, for a better cause.</Text>
        <Text style={tw`text-gray-400 text-xs mb-2`}>Where is my money going?</Text>
        <View style={tw`flex-row items-center`}>
          <DonationOption amount={25} />
          <DonationOption amount={50} />
          <DonationOption amount={75} />
          <DonationOption amount={100} />
        </View>
      </View>

      {/* Discounts / Vouchers */}
      <View style={tw`my-4`}>
        <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`text-white text-lg font-bold`}>Discounts / Vouchers</Text>
          <Text style={tw`text-pink-400 text-xs`}>See all</Text>
        </View>
        <Voucher />
        <Voucher />
      </View>

      {/* Price Breakdown */}
      <View style={tw`bg-gray-900 rounded-xl p-4 mb-4`}>
        <Text style={tw`text-white text-lg font-bold mb-2`}>PRICE BREAKDOWN</Text>
        <PriceDetail label="Outfit 1" price="$2077" />
        <PriceDetail label="Niek Shirt" price="$615" />
        <PriceDetail label="Addias Shoe" price="$1764" />
        <PriceDetail label="Platform Fee" price="$20" />
        <PriceDetail label="Shipping" price="$324" />
        <PriceDetail label="Rounded off (Donation)" price="$11" />
        <PriceDetail label="Discount" price="-$111" />
        <View style={tw`flex-row justify-between mt-4`}>
          <Text style={tw`text-white text-lg font-bold`}>Total</Text>
          <Text style={tw`text-white text-lg font-bold`}>$4700</Text>
        </View>
      </View>

      {/* Place Order */}
      <View style={tw`flex-row items-center justify-between px-4 py-3 bg-gray-800 rounded-lg mb-10`}>
        <Text style={tw`text-white`}>6 Items selected</Text>
        <View>
          <Link href="/payment" asChild>
            <Pressable style={tw`bg-pink-400 px-6 py-3 rounded-lg`}>
              <Text style={tw`text-black font-bold`}>PLACE ORDER</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

// Typing for CartItem component
type CartItemProps = {
  title: string;
  price: string;
  details: string;
  size?: string;
  qty?: string;
};

function CartItem({ title, price, details, size, qty }: CartItemProps) {
  return (
    <View style={tw`border-gray-700 p-4 flex-row`}>
      <Image source={require('@/assets/images/cart/outfit.png')} style={tw`w-24 h-24`} resizeMode="contain" />
      <View style={tw`flex-1 ml-2`}>
        <Text style={tw`text-white text-sm font-bold`}>{title}</Text>
        <Text style={tw`text-gray-400 text-xs`}>{details}</Text>
        {size && qty && (
          <View style={tw`flex-row mt-1`}>
            <Text style={tw`text-white text-xs`}>Size: {size}</Text>
            <Text style={tw`text-white text-xs ml-2`}>Qty: {qty}</Text>
          </View>
        )}
        <Text style={tw`text-gray-400 text-xs mt-1`}>
          Delivery By <Text style={tw`text-white text-xs mt-1`}>20th Oct</Text>
        </Text>
      </View>
      <View style={tw`items-center`}>
        <Text style={tw`text-white text-sm`}>{price}</Text>
        <View style={tw`flex-row pt-13`}>
          <Pressable style={tw`flex-row items-center`}>
            <Image source={require('@/assets/images/user/delete.png')} style={tw`h-4 w-4 mr-2`} />
            <Text style={tw`text-red-500`}>REMOVE</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

// Typing for DonationOption component
type DonationOptionProps = {
  amount: number;
};

function DonationOption({ amount }: DonationOptionProps) {
  return (
    <TouchableOpacity style={tw`px-4 py-1 bg-gray-800 rounded-full mx-1`}>
      <Text style={tw`text-white text-xs`}>${amount}</Text>
    </TouchableOpacity>
  );
}

// Typing for Voucher component
function Voucher() {
  return (
    <View style={tw`flex-row items-center bg-gray-800 p-3 rounded-lg my-2`}>
      <View style={tw`flex-1 flex-row`}>
        <Image source={require('@/assets/images/cart/voucher.png')} style={tw`w-8 h-8 mr-1`} resizeMode="contain" />
        <Text style={tw`text-white text-xs my-auto`}>50% Discount</Text>
      </View>
      <TouchableOpacity style={tw`bg-yellow-400 px-4 py-1 rounded-full`}>
        <Text style={tw`text-black font-bold text-xs`}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
}

// Typing for PriceDetail component
type PriceDetailProps = {
  label: string;
  price: string;
};

function PriceDetail({ label, price }: PriceDetailProps) {
  return (
    <View style={tw`flex-row justify-between my-1`}>
      <Text style={tw`text-white text-sm`}>{label}</Text>
      <Text style={tw`text-white text-sm`}>{price}</Text>
    </View>
  );
}
