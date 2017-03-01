module.exports = {
    getTeachers: [
        {
            $match: {
                access: 5
            }
        },
        {
            $unwind: '$subjects'
        },
        {
            $lookup: {
                from: 'subjects',
                localField: 'subjects',
                foreignField: '_id',
                as: 'subjects'
            }
        },
        {
            $project: {
                name: 1,
                avatar: 1,
                subjects: {
                    $arrayElemAt: ['$subjects', 0]
                }
            }
        },
        {
            $project: {
                name: 1,
                avatar: 1,
                subjects: {
                    _id: 1,
                    name: 1
                }
            }
        },
        {
            $group: {
                _id: '$_id',
                avatar: {$first: '$avatar'},
                name: {$first: '$name'},
                subjects: {$addToSet: '$subjects'}
            }
        }
    ],
    getTeacher: function (query) {
        return [
            {
                $match: query
            },
            {
                $unwind: '$subjects'
            },
            {
                $lookup: {
                    from: 'subjects',
                    localField: 'subjects',
                    foreignField: '_id',
                    as: 'subjects'
                }
            },
            {
                $project: {
                    name: 1,
                    subjects: {
                        $arrayElemAt: ['$subjects', 0]
                    }
                }
            },
            {
                $project: {
                    name: 1,
                    subjects: {
                        _id: 1,
                        name: 1
                    }
                }
            },
            {
                $group: {
                    _id: '$_id',
                    name: {$first: '$name'},
                    subjects: {$addToSet: '$subjects'}
                }
            }
        ];
    },
    getStatisticsGroups: [
        {
            $unwind: '$studentList'
        },
        {
            $lookup: {
                from: 'users',
                localField: 'studentList',
                foreignField: '_id',
                as: 'studentList'
            }
        },
        {
            $project: {
                name: 1,
                course: 1,
                student: {$arrayElemAt: ['$studentList', 0]}
            }
        },
        {
            $project: {
                name: 1,
                course: 1,
                jobs: '$student.jobs'
            }
        },
        {
            $unwind: '$jobs'
        },
        {
            $lookup: {
                from: 'jobs',
                localField: 'jobs',
                foreignField: '_id',
                as: 'job'
            }
        },
        {
            $project: {
                name: 1,
                course: 1,
                job: {$arrayElemAt: ['$job', 0]}
            }
        },
        {
            $project: {
                name: 1,
                course: 1,
                rating: '$job.rating'
            }
        },
        {
            $group: {
                _id: '$_id',
                name: {$first: '$name'},
                course: {$first: '$course'},
                avg: {$avg: '$rating'}
            }
        }
    ],
    getStatisticsCourse: [
        {
            $unwind: '$studentList'
        },
        {
            $lookup: {
                from: 'users',
                localField: 'studentList',
                foreignField: '_id',
                as: 'studentList'
            }
        },
        {
            $project: {
                name: 1,
                course: 1,
                student: {$arrayElemAt: ['$studentList', 0]}
            }
        },
        {
            $project: {
                name: 1,
                course: 1,
                jobs: '$student.jobs'
            }
        },
        {
            $unwind: '$jobs'
        },
        {
            $lookup: {
                from: 'jobs',
                localField: 'jobs',
                foreignField: '_id',
                as: 'job'
            }
        },
        {
            $project: {
                name: 1,
                course: 1,
                job: {$arrayElemAt: ['$job', 0]}
            }
        },
        {
            $project: {
                _id: 0,
                name: 1,
                course: 1,
                rating: '$job.rating'
            }
        },
        {
            $group: {
                _id: '$course',
                name: {$first: '$name'},
                avg: {$avg: '$rating'}
            }
        },
        {
            $project: {
                _id: 0,
                name: '$_id',
                avg: 1
            }
        }
    ],
    getStatisticsSubjects: [
        {
            $unwind: '$studentList'
        },
        {
            $lookup: {
                from: 'users',
                localField: 'studentList',
                foreignField: '_id',
                as: 'studentList'
            }
        },
        {
            $project: {
                name: 1,
                student: {$arrayElemAt: ['$studentList', 0]}
            }
        },
        {
            $project: {
                name: 1,
                jobs: '$student.jobs'
            }
        },
        {
            $unwind: '$jobs'
        },
        {
            $lookup: {
                from: 'jobs',
                localField: 'jobs',
                foreignField: '_id',
                as: 'job'
            }
        },
        {
            $project: {
                name: 1,
                job: {$arrayElemAt: ['$job', 0]}
            }
        },
        {
            $project: {
                _id: 0,
                name: 1,
                rating: '$job.rating'
            }
        },
        {
            $group: {
                _id: '$name',
                avg: {$avg: '$rating'}
            }
        },
        {
            $project: {
                _id: 0,
                name: '$_id',
                avg: 1
            }
        }
    ],
    getBlogs: function (_id) {
        return [
            {
                $lookup: {
                    from: 'users',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'author'
                }
            },
            {
                $project: {
                    name: 1,
                    followers: 1,
                    author: {$arrayElemAt: ['$author', 0]}
                }
            },
            {
                $project: {
                    name: 1,
                    follower: {$in: [_id, '$followers']},
                    author: '$author.name'
                }
            }
        ];
    },
    getBlog: function (_id) {
        return [
            {
                $match: {
                    _id: _id
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'author'
                }
            },
            {
                $project: {
                    name: 1,
                    posts: 1,
                    author: {$arrayElemAt: ['$author', 0]}
                }
            },
            {
                $project: {
                    name: 1,
                    posts: 1,
                    author: '$author.name'
                }
            },
            {
                $unwind: '$posts'
            },
            {
                $lookup: {
                    from: 'posts',
                    localField: 'posts',
                    foreignField: '_id',
                    as: 'posts'
                }
            },
            {
                $project: {
                    name: 1,
                    author: 1,
                    posts: {$arrayElemAt: ['$posts', 0]}
                }
            },
            {
                $group: {
                    _id: '$_id',
                    name: {$first: '$name'},
                    author: {$first: '$author'},
                    posts: {$addToSet: '$posts'}
                }
            }
        ];
    },
    getComments: function (_id) {
        return [
            {
                $match: {
                    _id: _id
                }
            },
            {
                $unwind: '$comments'
            },
            {
                $lookup: {
                    from: 'comments',
                    localField: 'comments',
                    foreignField: '_id',
                    as: 'comments'
                }
            },
            {
                $project: {
                    comments: {$arrayElemAt: ['$comments', 0]}
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'comments.author',
                    foreignField: '_id',
                    as: 'comments.author'
                }
            },
            {
                $project: {
                    comments: {
                        _id: 1,
                        text: 1,
                        date: 1
                    },
                    'comments.author': {$arrayElemAt: ['$comments.author', 0]}
                }
            },
            {
                $project: {
                    comments: {
                        _id: 1,
                        text: 1,
                        date: 1
                    },
                    'comments.author': {
                        _id: 1,
                        name: 1,
                        avatar: 1
                    }
                }
            },
            {
                $group: {
                    _id: '$_id',
                    comments: {$addToSet: '$comments'}
                }
            }
        ];
    },
    getGroup: function (_id) {
        return [
            {
                $match: {
                    _id: _id
                }
            },
            {
                $unwind: '$studentList'
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'studentList',
                    foreignField: '_id',
                    as: 'student'
                }
            },
            {
                $project: {
                    name: 1,
                    course: 1,
                    student: {
                        $arrayElemAt: ['$student', 0]
                    }
                }
            },
            {
                $project: {
                    name: 1,
                    course: 1,
                    student: {
                        _id: 1,
                        avatar: 1,
                        name: 1,
                        date: 1
                    }
                }
            },
            {
                $group: {
                    _id: '$_id',
                    name: {$first: '$name'},
                    course: {$first: '$course'},
                    students: {$addToSet: '$student'}
                }
            }
        ]
    }
};