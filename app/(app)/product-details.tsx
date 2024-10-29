import { Text, View, ScrollView, Image, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import tw from 'twrnc';
import { useState } from 'react';

type Review = {
  id: number;
  user: string;
  text: string;
  rating: 'positive' | 'negative';
  helpfulCount: number;  // Number of people who found the review helpful
  date: string;          // Date when the product was bought
  size: string;          // Size purchased in the review
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  discount: string;
  originalPrice: string;
  deliveryDate: string;
  reviews: Review[],
  posReview?: number,
  negReview?: number,
  colours: {
    code: string;
    name: string;
    ownCode: string;
    class: string;
  }[];
  sizes: string[];
};

type Params = {
  id: string;
};

type Recommended = {
  id: number;
  brand: string;
  name: string;
  rating: number;
  ratingColor: string;
};

export default function ProductDetails() {
  const { id } = useLocalSearchParams<Params>();
  const [selectedColor, setSelectedColor] = useState<Product['colours'][number] | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('Most Relevant');

  const [helpfulStatuses, setHelpfulStatuses] = useState<{ [key: number]: boolean }>({});

  const toggleSortDropdown = () => {
    setSortDropdownVisible(!sortDropdownVisible);
  };

  const handleSortOption = (option: string) => {
    setSelectedSortOption(option);
    setSortDropdownVisible(false);
    // Add sorting logic here based on the option
    console.log(`Sorted by: ${option}`);
  };

  const toggleHelpful = (reviewId: number) => {
    setHelpfulStatuses((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId], // Toggle the helpful status for the specific review
    }));
  };
  // Mock product details based on ID
  // FOR BACKEND: have available sizes under colours so when colours are selected, the available sizes can be seen at once
  const product: Product = {
    id: id,
    name: 'Niek Shirt Opaque',
    description: 'A cool and stylish t-shirt with high durability.',
    price: '$103.85',
    discount: '50% OFF',
    originalPrice: '$206.70',
    deliveryDate: '06/10',
    reviews: [
      {
        id: 1,
        user: 'John',
        text: 'This Niek shirt is cool!',
        rating: 'positive',
        helpfulCount: 27,
        date: '11/09/24',
        size: 'M',
      },
      {
        id: 2,
        user: 'Jane',
        text: 'This Niek shirt is NOT cool!',
        rating: 'negative',
        helpfulCount: 13,
        date: '10/15/24',
        size: 'S',
      },
    ],
    posReview: 90,
    negReview: 10,
    colours: [
      { code: '#FFD700', name: 'YELLOW', ownCode: '05', class: 'bg-yellow-500' },
      { code: '#800080', name: 'PURPLE', ownCode: '08', class: 'bg-purple-500' },
      { code: '#808080', name: 'GRAY', ownCode: '12', class: 'bg-gray-500' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  };

  const recommendeds: Recommended[] = [
    { id: 1, brand: 'NIKE', name: 'NIEK SHIRT', rating: 90, ratingColor: 'green' },
    { id: 2, brand: 'ABIBAS', name: 'ABIBAS SHIRT', rating: 25, ratingColor: 'red' },
    { id: 3, brand: 'PUMPA', name: 'PUMPA SHIRT', rating: 75, ratingColor: 'orange' },
  ];

  return (
    <ScrollView style={tw`flex-1 bg-black`} contentContainerStyle={tw`p-6`}>
      <View style={tw`bg-gray-100`}>
        <Image
          source={require('@/assets/images/tshirt.png')}
          style={tw`h-80 w-full`}
          resizeMode="contain"
        />
        <View style={tw`absolute right-4 bottom-4 gap-3`}>
          <Pressable>
            <Image source={require('@/assets/images/star(colour).png')} style={tw`w-7 h-7`} resizeMode='contain' />
          </Pressable>
          <Pressable>
            <Image source={require('@/assets/images/heart(colour).png')} style={tw`w-7 h-7`} resizeMode='contain' />
          </Pressable>
          <Pressable>
            <Image source={require('@/assets/images/share(colour).png')} style={tw`w-7 h-7`} resizeMode='contain' />
          </Pressable>
        </View>
      </View>

      {/* Product Details */}
      <View style={tw`mt-6`}>
        {/* product name + % liked DYNAMIC */}
        <View style={tw`flex-row`}>
          <Text style={tw`text-2xl font-bold text-white`}>{product.name}</Text>
          <Text style={tw`text-green-500 font-bold text-xl top-1 left-1`}>90%</Text>
          <Image source={require('@/assets/images/like.png')} style={tw`w-6 h-6 top-1 left-2`} resizeMode='contain' />
        </View>

        {/* original price + discount % + discounted price + delivery date DYNAMIC */}
        <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`text-white text-xl`}>{product.price}</Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-gray-500 line-through mr-2`}>{product.originalPrice}</Text>
          <Text style={tw`text-red-500`}>{product.discount}</Text>
        </View>
        <Text style={tw`text-gray-400`}>Delivery by: {product.deliveryDate}</Text>
      </View>

      {/* Colour Selector DYNAMIC: picture should change to show selected colour shirt */}
      <View style={tw`mt-6`}>
        <Text style={tw`text-white font-semibold mb-2 text-base`}>
          COLOUR: {selectedColor ? selectedColor.ownCode + ' ' + selectedColor.name : ''}
        </Text>

        <View style={tw`flex-row gap-2`}>
          {product.colours.map((color, index) => (
            <Pressable
              key={index}
              onPress={() => setSelectedColor(color)} // Set selected color on press
              style={[
                tw`border-2 rounded-full w-10 h-10 ${color.class}`, // Dynamically apply class from product colours
                selectedColor?.code === color.code && tw`border-white border-2 p-1`, // Add black border if selected
              ]}
            />
          ))}
        </View>
      </View>

      {/* Size Selection DYNAMIC: sizes not available will be greyed and crossed out */}
      <View style={tw`mt-6`}>
        <Text style={tw`text-white font-semibold mb-2 text-base`}>
          SIZE: {selectedSize ? selectedSize : ''}
        </Text>

        <View style={tw`flex-row gap-2`}>
          {product.sizes.map((size) => (
            <Pressable
              key={size}
              onPress={() => setSelectedSize(size)}
              style={[
                tw`border-2 rounded-full w-10 h-10 px-4 py-2 border-gray-400`,
                selectedSize === size ? tw`bg-white border-2 p-1` : tw`p-1`,
              ]}
            >
              <Text style={tw`text-sm font-bold m-auto ${selectedSize === size ? 'text-black' : 'text-white'}`}>
                {size}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>



      {/* Buy/Add to Bag Buttons */}
      <View style={tw`mt-6 flex-row gap-8`}>
        <Pressable style={tw`bg-white flex-1 p-4 rounded-full justify-center items-center`}>
          <Text style={tw`text-black font-semibold`}>BUY NOW</Text>
        </Pressable>
        <Pressable style={tw`bg-white flex-1 p-4 rounded-full justify-center items-center`}>
          <Text style={tw`text-black font-semibold`}>ADD TO CART</Text>
        </Pressable>
      </View>

      {/* Customer Reviews POSSIBLE CHANGES: switch to a 5 star rating instead of binary? consider fitting level: tight - perfect fit - loose*/}
      <View style={tw`mt-6 border-t border-gray-500`}>
        <View style={tw`flex-row justify-between items-center mb-2 mt-4`}>
          <Text style={tw`text-lg font-bold text-white`}>CUSTOMER REVIEWS</Text>
          <Pressable onPress={toggleSortDropdown} style={tw`flex-row items-center`}>
            <Text style={tw`text-white text-sm mr-1`}>SORT BY: {selectedSortOption}</Text>
            <Image source={require('@/assets/images/filter.png')} style={tw`w-4 h-4`} resizeMode='contain' />
          </Pressable>
        </View>

        {/* Sort Dropdown */}
        {sortDropdownVisible && (
          <View style={tw`absolute top-14 right-4 bg-white border border-gray-400 rounded-md w-40 z-10`}>
            {['Most Recent', 'Positive', 'Negative'].map((option) => (
              <Pressable
                key={option}
                onPress={() => handleSortOption(option)}
                style={tw`px-4 py-2 border-b border-gray-300 ${selectedSortOption === option ? 'bg-gray-200' : 'bg-white'}`}
              >
                <Text style={tw`text-black text-sm`}>{option}</Text>
              </Pressable>
            ))}
          </View>
        )}
        <View style={tw`m-2`}>
          <View style={tw`flex-row`}>
            <Text style={tw`text-base font-bold text-white`}>OVERALL: </Text>
            <Text style={tw`text-base font-bold text-green-600`}>POSITIVE</Text>
          </View>
          <View style={tw`flex-row w-40 h-4 bg-gray-800 rounded-full`}>

            <View style={[tw`h-full bg-green-400 rounded-l-full`, { width: `${product.posReview}%` }]} />
            <View style={[tw`h-full bg-red-500 rounded-r-full`, { width: `${product.negReview}%` }]} />
          </View>

          <View style={tw`flex-row justify-between w-40 h-4`}>
            <View style={tw`flex-row top-1`}>
              <Text style={tw`text-green-400 text-xs mr-1`}>{product.posReview}%</Text>
              <Image source={require('@/assets/images/like.png')} style={tw`w-4 h-4`} resizeMode='contain' />
            </View>
            <View style={tw`flex-row top-1`}>
              <Image source={require('@/assets/images/dislike.png')} style={tw`w-4 h-4 mr-1`} resizeMode='contain' />
              <Text style={tw`text-red-500 text-xs`}>{product.negReview}%</Text>
            </View>
          </View>

          {/* Review */}
          <ScrollView style={tw`mt-4`} showsVerticalScrollIndicator={false}>
            {product.reviews.map((review) => (
              <View
                key={review.id}
                style={[
                  tw`p-4 mb-4 rounded-lg`,
                  review.rating === 'positive'
                    ? tw`bg-[#0f180f]`  // Dark green tint for positive reviews
                    : tw`bg-[#1b0606]`, // Dark red tint for negative reviews
                ]}
              >
                <View style={tw`flex-row justify-between`}>
                  {/* Helpful Section */}
                  {review.rating === 'positive' ?
                    <Text style={tw`text-green-500 mb-1`}>
                      {review.helpfulCount} PEOPLE FOUND THIS REVIEW HELPFUL
                    </Text> :
                    <Text style={tw`text-red-500 mb-1`}>
                      {review.helpfulCount} PEOPLE FOUND THIS REVIEW HELPFUL
                    </Text>}

                  {/* Helpful Icon */}
                  <Pressable style={tw`flex items-center`} onPress={() => toggleHelpful(review.id)}>
                    <Image
                      source={
                        helpfulStatuses[review.id]
                          ? review.rating === 'positive'
                            ? require('@/assets/images/star(green).png')  // Green star image for positive reviews
                            : require('@/assets/images/star(red).png')    // Red star image for negative reviews
                          : require('@/assets/images/star(empty).png')     // Empty star when not marked helpful
                      }
                      style={tw`w-5 h-5 mb-1`}
                    />
                    <Text style={tw`text-white text-sm`}>Helpful</Text>
                  </Pressable>
                </View>
                {/* User Info */}
                <View style={tw`flex-row justify-between`}>
                  <View>
                    <Text style={tw`text-white font-bold`}>{review.user}</Text>
                    <Text style={tw`text-gray-500`}>
                      Bought on {review.date} Size: {review.size}
                    </Text>
                  </View>


                </View>

                {/* Feedback */}
                <View style={tw`flex-row items-center mt-3`}>
                  {/* Emoji Icon */}
                  {review.rating === 'positive' ?
                    <View style={tw`flex-row`}>
                      <Image source={require('@/assets/images/smiley.png')} style={tw`w-5 h-5 mr-1`} resizeMode='contain' />
                      <Text style={tw`text-green-500 text-lg font-bold bottom-1`}>Hit!</Text>
                    </View> :
                    <View style={tw`flex-row`}>
                      <Image source={require('@/assets/images/sad.png')} style={tw`w-5 h-5 mr-1`} resizeMode='contain' />
                      <Text style={tw`text-red-500 text-lg font-bold bottom-1`}>Miss!</Text>
                    </View>
                  }

                </View>

                {/* Review Text */}
                <Text style={tw`text-white mt-2 text-lg`}>{review.text}</Text>
              </View>
            ))}
          </ScrollView>

        </View>
      </View>

      <View style={tw`mt-6 border-t border-gray-500`}>
        {/* Product Details */}
        <View style={tw``}>
          <Text style={tw`text-white text-xl font-bold mb-4 mt-4`}>Product Details</Text>
          <Text style={tw`text-gray-400`}>• Contains Cotton</Text>
          <Text style={tw`text-gray-400`}>• Comfortable Wear</Text>
          <Text style={tw`text-gray-400`}>• Machine Washable</Text>
          <Text style={tw`text-gray-400`}>• Recyclable Packaging</Text>
        </View>
      </View>

      {/* KEEP LOOKIN GOOD */}
      <View style={tw`mt-6 border-t border-gray-500`}>
        <View style={tw`mb-4 mt-4`}>
          <Text style={tw`text-lg font-bold text-white`}>KEEP LOOKIN' GOOD</Text>
          <Text style={tw`text-base font-bold text-gray-400`}>RECOMMENDED</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`flex-row`}>
          {recommendeds.map((recommended) => (
            <View
              key={recommended.id}
              style={tw`mr-4`}
            >
              {/* Product Image */}
              <View style={tw``}>
                <Image
                  source={require('@/assets/images/recommended1.png')} // Replace with your actual image
                  style={tw`w-48 h-72 rounded-lg`}
                  resizeMode="cover"
                />
                {/* Favorite Icon */}
                <Pressable style={tw`absolute bottom-2 right-2`}>
                  <Image
                    source={require('@/assets/images/heart(colour).png')} // Replace with your heart icon path
                    style={tw`w-6 h-6`}
                  />
                </Pressable>
              </View>

              {/* Product Info */}
              <Text style={tw`text-xs text-gray-500 mt-2`}>{recommended.brand}</Text>


              {/* Rating */}
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-base text-white font-bold mr-1`}>{recommended.name}</Text>
                <Text style={tw`text-sm font-bold text-${recommended.ratingColor}-500`}>{recommended.rating}%</Text>
                <Text style={tw`text-lg ml-1 ${recommended.ratingColor === 'green' ? 'text-green-500' : 'text-red-500'}`}></Text>
                {recommended.rating >= 50 ?
                  <Image source={require('@/assets/images/like.png')} style={tw`w-4 h-4`} resizeMode='contain' /> :
                  <Image source={require('@/assets/images/dislike.png')} style={tw`w-4 h-4`} resizeMode='contain' />}

              </View>


            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
