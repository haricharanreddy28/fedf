#!/bin/bash

echo "🚀 Starting SafeSpace Application..."
echo ""

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first:"
    echo "   brew services start mongodb-community"
    echo "   or"
    echo "   mongod"
    echo ""
    read -p "Press Enter to continue anyway..."
fi

# Start backend server
echo "📦 Starting backend server..."
cd server
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start frontend
echo "🎨 Starting frontend server..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Application started!"
echo "   Backend: http://localhost:3001"
echo "   Frontend: http://localhost:2911"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for user interrupt
wait

