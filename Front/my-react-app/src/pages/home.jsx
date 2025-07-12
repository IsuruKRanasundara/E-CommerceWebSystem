import { useAuth, useLogout } from "@/hooks/use-auth";
import { Button } from "@/component/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card";
import { LogOut, User, ShoppingBag, Heart, Package } from "lucide-react";

export default function Home() {
  const { user } = useAuth();
  const logout = useLogout();

  const handleLogout = async () => {
    await logout.mutateAsync();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <ShoppingBag className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">ShopHub</h1>
                <p className="text-sm text-gray-600">Premium E-commerce</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <User className="text-orange-600 text-sm" />
                </div>
                <span className="text-gray-700 font-medium">{user?.name}</span>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-orange-200 text-orange-600 hover:bg-orange-50"
                disabled={logout.isPending}
              >
                {logout.isPending ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-600 mr-2"></div>
                ) : (
                  <LogOut className="h-4 w-4 mr-2" />
                )}
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-gray-600">
            Discover amazing products and deals tailored just for you.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-orange-200 hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-gray-800">My Orders</CardTitle>
                <Package className="text-orange-500 h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-600 mb-2">12</p>
              <p className="text-sm text-gray-600">Total orders placed</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-gray-800">Wishlist</CardTitle>
                <Heart className="text-orange-500 h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-600 mb-2">8</p>
              <p className="text-sm text-gray-600">Items saved for later</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-gray-800">Rewards</CardTitle>
                <ShoppingBag className="text-orange-500 h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-600 mb-2">150</p>
              <p className="text-sm text-gray-600">Points earned</p>
            </CardContent>
          </Card>
        </div>

        {/* Featured Products */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Featured Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="border-orange-200 hover:shadow-lg transition-all duration-200 hover:scale-105">
                <CardContent className="p-4">
                  <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg mb-4 flex items-center justify-center">
                    <ShoppingBag className="text-orange-500 h-8 w-8" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Premium Product {item}</h4>
                  <p className="text-sm text-gray-600 mb-3">High-quality item perfect for your needs</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-orange-600">${99 + item * 50}</span>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* User Profile Section */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{user?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{user?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Status</label>
                <p className="text-green-600 bg-green-50 p-3 rounded-lg font-medium">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
