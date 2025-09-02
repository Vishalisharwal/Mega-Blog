import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from '../components/container/Container';
import Button from '../components/Button';
import appwriteService from "../appwrite/config";
import PostCard from '../components/PostCard';

function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (authStatus) {
            appwriteService.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            });
        }
    }, [authStatus]);

    if (!authStatus) {
        return (
            <div className="py-16">
                <Container>
                    <div className="text-center py-20 bg-white rounded-lg shadow-lg">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 tracking-tight">
                            Start Your Blogging Journey
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-8">
                            Join our community to write, read, and share your unique stories and thoughts with the world.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link to="/signup">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg">
                                    Sign Up Now
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full shadow-lg">
                                    Log In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
    
    // This part of the code will only be executed if the user is authenticated.
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    ) : (
                        <div className="p-2 w-full text-center">
                            <h2 className="text-2xl font-semibold text-gray-700">No posts found.</h2>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default Home;