<?php

namespace App\Http\Controllers\Admin;

use App\Models\ClassRoom;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class ClassRoomController extends Controller
{

    public function index()
    {
        $classes = ClassRoom::with('teacher')
            ->select('id', 'name', 'section', 'teacher_id', 'created_at')
            ->latest()
            ->paginate(10);

        return Inertia::render('Classes/Index', [
            'classes' => $classes,
        ]);
    }


    public function create()
    {
        $teachers = Teacher::select('id', 'name')->get();
        return Inertia::render('Classes/Create', [
            'teachers' => $teachers
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'section' => ['required', 'string', 'max:255'],
                'teacher_id' => ['required', 'exists:teachers,id'],
            ], [
                'name.required' => 'حقل الاسم مطلوب',
                'name.max' => 'يجب ألا يتجاوز الاسم 255 حرفًا',
                'section.required' => 'حقل القسم مطلوب',
                'section.max' => 'يجب ألا يتجاوز القسم 255 حرفًا',
                'teacher_id.required' => 'حقل المدرس مطلوب',
                'teacher_id.exists' => 'المدرس المحدد غير موجود'
            ]);

            ClassRoom::create($validated);

            return Inertia::location(route('admin.classes.index'));
        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->errors());
        }
    }

    public function edit($id)
    {
        $classRoom = ClassRoom::select('id', 'name', 'section', 'teacher_id')
            ->findOrFail($id);
        $teachers = Teacher::select('id', 'name')->get();

        return Inertia::render('Classes/Edit', [
            'classRoom' => $classRoom,
            'teachers' => $teachers,
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'section' => ['required', 'string', 'max:255'],
                'teacher_id' => ['required', 'exists:teachers,id'],
            ], [
                'name.required' => 'حقل الاسم مطلوب',
                'name.max' => 'يجب ألا يتجاوز الاسم 255 حرفًا',
                'section.required' => 'حقل القسم مطلوب',
                'section.max' => 'يجب ألا يتجاوز القسم 255 حرفًا',
                'teacher_id.required' => 'حقل المدرس مطلوب',
                'teacher_id.exists' => 'المدرس المحدد غير موجود'
            ]);

            $classRoom = ClassRoom::findOrFail($id);
            $classRoom->update($validated);

            session()->flash('success', 'تم تحديث الصف بنجاح');

            return Inertia::location(route('admin.classes.index'));
        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->errors());
        }
    }

    public function destroy($id)
    {
        $ClassRoom = ClassRoom::findOrFail($id);
        $ClassRoom->delete();

        return Inertia::location(route('admin.classes.index'));
    }

    public function getClasses()
    {
        $classes = ClassRoom::all();
        return response()->json($classes, 200);
    }
}
